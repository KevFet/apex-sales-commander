import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { notes } = await request.json();

    const emailContent = `
      <h1>Apex Sales Commander Log</h1>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <hr />
      ${Object.entries(notes).map(([step, note]) => `
        <div style="margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-left: 4px solid #00FF7F;">
          <h3>Phase ${parseInt(step) + 1}</h3>
          <pre style="white-space: pre-wrap; font-family: sans-serif;">${note}</pre>
        </div>
      `).join('')}
    `;

    const response = await resend.emails.send({
      from: 'Apex COMMANDER <onboarding@resend.dev>',
      to: ['contact@kevinfetiveau.com'],
      subject: `New Sales Mission Report - ${new Date().toLocaleDateString()}`,
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
