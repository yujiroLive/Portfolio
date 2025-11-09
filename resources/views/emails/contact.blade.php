<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
        }
        .label {
            font-weight: bold;
            color: #7b2cbf;
            display: block;
            margin-bottom: 5px;
        }
        .value {
            color: #333;
            padding: 10px;
            background: white;
            border-left: 3px solid #9d4edd;
            border-radius: 4px;
        }
        .message-box {
            white-space: pre-wrap;
            min-height: 100px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">New Contact Form Message</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new message from your portfolio website</p>
    </div>
    
    <div class="content">
        <div class="field">
            <span class="label">Name:</span>
            <div class="value">{{ $name }}</div>
        </div>
        
        <div class="field">
            <span class="label">Email:</span>
            <div class="value">
                <a href="mailto:{{ $email }}" style="color: #7b2cbf; text-decoration: none;">{{ $email }}</a>
            </div>
        </div>
        
        <div class="field">
            <span class="label">Message:</span>
            <div class="value message-box">{{ $message }}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>This email was sent from your portfolio contact form.</p>
        <p>You can reply directly to this email to respond to {{ $name }}.</p>
    </div>
</body>
</html>

