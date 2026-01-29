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
        .ticket-details {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            padding: 8px 0;
        }
        .detail-label {
            font-weight: 600;
            color: #6b7280;
            width: 120px;
            font-size: 14px;
        }
        .detail-value {
            flex: 1;
            color: #1f2937;
            font-size: 14px;
        }
        .priority-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            text-transform: capitalize;
        }
        .priority-high {
            background: #fee2e2;
            color: #991b1b;
        }
        .priority-medium {
            background: #fef3c7;
            color: #92400e;
        }
        .priority-low {
            background: #dbeafe;
            color: #1e40af;
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
            padding: 24px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Ticket Alert</h1>
        </div>
        <div class="content">
            <p>A new support ticket has been created and requires your attention.</p>
            
            <div class="ticket-details">
                <div class="detail-row">
                    <div class="detail-label">Title</div>
                    <div class="detail-value"><strong>{{ $ticket->title }}</strong></div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Created by</div>
                    <div class="detail-value">{{ $ticket->user->name ?? 'N/A' }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Priority</div>
                    <div class="detail-value">
                        <span class="priority-badge priority-{{ $ticket->priority }}">
                            {{ ucfirst($ticket->priority) }}
                        </span>
                    </div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">{{ ucfirst(str_replace('_', ' ', $ticket->status)) }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Ticket ID</div>
                    <div class="detail-value">#{{ $ticket->id }}</div>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="{{ env('FRONTEND_URL') }}/tickets/{{ $ticket->id }}" class="button">View Ticket</a>
            </div>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} Support Ticket System</p>
        </div>
    </div>
</body>
</html>
