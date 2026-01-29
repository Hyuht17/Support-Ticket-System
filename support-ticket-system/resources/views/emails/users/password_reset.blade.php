<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
            color: #1f2937;
            background-color: #f3f4f6;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: #2563eb;
            color: white;
            padding: 24px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 32px 24px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        .password-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            padding: 16px;
            margin: 24px 0;
            border-radius: 6px;
            text-align: center;
        }
        .password-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 8px;
        }
        .password {
            font-size: 28px;
            font-weight: 700;
            color: #2563eb;
            font-family: 'Courier New', monospace;
            letter-spacing: 2px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            margin-top: 16px;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <div class="greeting">
                Hello {{ $user->name }},
            </div>
            <p class="message">
                Your account password has been reset by an administrator. For security reasons, please use the temporary password below to login and change it immediately.
            </p>
            
            <div class="password-box">
                <div class="password-label">Your new password</div>
                <div class="password">{{ $password }}</div>
            </div>
            
            <p>Please login and change your password immediately for security.</p>
            
            <div style="text-align: center;">
                <a href="{{ env('FRONTEND_URL') }}/login" class="button">Login Now</a>
            </div>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} Support Ticket System</p>
        </div>
    </div>
</body>
</html>