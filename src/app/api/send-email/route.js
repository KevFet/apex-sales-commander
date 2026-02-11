import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { notes, prospectInfo } = await request.json();

    const info = prospectInfo || { name: 'Unknown', company: 'Unknown', email: 'N/A', phone: 'N/A', website: 'N/A' };

    const emailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto;">
        <div style="background: #000; color: #00FF7F; padding: 20px; text-align: center;">
          <h1 style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Apex Sales Mission Log</h1>
          <p style="color: #888; margin-top: 5px;">${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background: #111; color: #FFF; padding: 20px; margin: 20px 0; border-left: 5px solid #00FF7F;">
            <h2 style="margin: 0 0 15px 0; color: #00FF7F; text-transform: uppercase; font-size: 18px;">TARGET INTEL (PHASE 0)</h2>
            <p style="margin: 5px 0;"><strong>PROSPECT:</strong> ${info.name}</p>
            <p style="margin: 5px 0;"><strong>COMPANY:</strong> ${info.company}</p>
            <p style="margin: 5px 0;"><strong>CONTACT:</strong> ${info.email} | ${info.phone}</p>
            <p style="margin: 5px 0;"><strong>WEBSITE:</strong> <a href="${info.website}" style="color: #00FF7F;">${info.website}</a></p>
        </div>

        <hr style="border: 0; border-top: 1px solid #ddd; margin: 30px 0;" />
        
        ${Object.entries(notes).map(([step, note]) => `
        <div style="margin-bottom: 25px; padding: 0;">
          <h3 style="margin: 0 0 10px 0; color: #333; text-transform: uppercase; border-bottom: 2px solid #000; display: inline-block;">Phase ${parseInt(step) + 1}</h3>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #333; margin-top: 5px;">
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px; margin: 0; color: #444;">${note}</pre>
          </div>
        </div>
        `).join('')}
      </div>
    `;

    const response = await resend.emails.send({
      from: 'Apex COMMANDER <onboarding@resend.dev>',
      to: ['fetiveaukevin@gmail.com'],
      subject: `Mission Report: ${info.company} - ${info.name}`,
      html: emailContent,
    });

    console.log("Resend API Full Response:", response);

    if (response.error) {
      return Response.json({ error: response.error }, { status: 400 });
    }

    return Response.json(response.data);
  } catch (error) {
    console.error("Server Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
