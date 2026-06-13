import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, location, stars, text } = body;

    // Validate request data
    if (!name || !location || !stars || !text) {
      return NextResponse.json(
        { error: 'All fields (name, location, stars, text) are required.' },
        { status: 400 }
      );
    }

    const rating = parseInt(stars, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Stars must be a number between 1 and 5.' },
        { status: 400 }
      );
    }

    // Resolve path to testimonials.json
    const filePath = path.join(process.cwd(), 'src', 'lib', 'testimonials.json');

    // Read current testimonials
    let testimonialsList = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      testimonialsList = JSON.parse(fileData);
    }

    // Generate unique ID
    const newId = testimonialsList.length > 0 
      ? Math.max(...testimonialsList.map(t => t.id)) + 1 
      : 1;

    // Create new testimonial object
    const newTestimonial = {
      id: newId,
      name,
      location,
      stars: rating,
      text
    };

    // Add to list and save to file
    testimonialsList.push(newTestimonial);
    fs.writeFileSync(filePath, JSON.stringify(testimonialsList, null, 2), 'utf8');

    // Attempt Git Commit and Push
    let gitStatus = 'skipped';
    try {
      const gitCwd = process.cwd();
      
      // Check if git is initialized and there is a remote
      const { stdout: hasRemote } = await execAsync('git remote', { cwd: gitCwd }).catch(() => ({ stdout: '' }));
      
      if (hasRemote.trim()) {
        const sanitizedName = name.replace(/[^a-zA-Z0-9\s&_.-]/g, '');
        await execAsync(`git add src/lib/testimonials.json`, { cwd: gitCwd });
        await execAsync(`git commit -m "chore: add new testimonial from ${sanitizedName} [skip ci]"`, { cwd: gitCwd });
        await execAsync(`git push`, { cwd: gitCwd });
        gitStatus = 'success';
        console.log(`Successfully committed and pushed new review from ${sanitizedName} to GitHub.`);
      } else {
        gitStatus = 'no_remote';
        console.log('No git remote configured. Review saved locally but git push skipped.');
      }
    } catch (gitError) {
      console.error('Git automation failed, but review was saved locally:', gitError.message);
      gitStatus = `failed: ${gitError.message}`;
    }

    return NextResponse.json({
      success: true,
      testimonial: newTestimonial,
      gitStatus
    });

  } catch (error) {
    console.error('API Testimonials Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
