# API Contracts - DigitalFlow Landing Page

## Backend Implementation Plan

### Database: PostgreSQL

**Table: contact_requests**
```sql
CREATE TABLE contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new',
    admin_notes TEXT
);
```

### API Endpoints

#### 1. Submit Contact Form
**POST** `/api/contact`

**Request Body:**
```json
{
    "name": "string (required)",
    "email": "string (required, valid email)",
    "service": "string (optional)",
    "message": "string (required)"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Спасибо за заявку! Мы свяжемся с вами в течение часа.",
    "id": 123
}
```

#### 2. Admin Panel - Get All Requests
**GET** `/api/admin/requests`

**Query Parameters:**
- `status`: filter by status (new, processed, closed)
- `page`: pagination page number
- `limit`: items per page

**Response:**
```json
{
    "requests": [
        {
            "id": 1,
            "name": "Иван Иванов",
            "email": "ivan@example.com",
            "service": "website",
            "message": "Нужен сайт для бизнеса",
            "created_at": "2024-01-01T10:00:00Z",
            "status": "new",
            "admin_notes": null
        }
    ],
    "total": 50,
    "page": 1,
    "limit": 10
}
```

#### 3. Admin Panel - Update Request Status
**PUT** `/api/admin/requests/{id}`

**Request Body:**
```json
{
    "status": "processed",
    "admin_notes": "Связались с клиентом"
}
```

### Email Integration

**Service:** SMTP (будем использовать Gmail SMTP)
**When:** При создании новой заявки
**To:** admin email
**Template:** Уведомление о новой заявке с деталями

### Frontend Integration Changes

**Files to update:**
- `src/components/ContactForm.jsx`: replace `mockSubmitForm` with actual API call
- Remove mock data dependencies where not needed

**API Integration:**
```javascript
// Replace mockSubmitForm in ContactForm.jsx
const submitForm = async (formData) => {
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    return await response.json();
};
```

### Admin Panel Routes

**Frontend Routes:**
- `/admin` - Admin login
- `/admin/dashboard` - Requests overview
- `/admin/requests` - Detailed requests list

**Features:**
- Simple password authentication
- Filter requests by status
- Update request status
- Export requests to CSV
- Basic analytics (requests per day/month)

### Dependencies to Install

**Backend:**
- `psycopg2-binary` - PostgreSQL adapter
- `sqlalchemy` - ORM
- `alembic` - Database migrations
- `python-multipart` - Form data handling
- `smtplib` (built-in) - Email sending
- `jinja2` - Email templates

### Environment Variables Needed

```env
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/digitalflow

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@digitalflow.ru

# Admin
ADMIN_PASSWORD=secure_admin_password
```

### Implementation Steps

1. **Setup PostgreSQL** - Install and configure
2. **Create Models** - SQLAlchemy models for database
3. **API Endpoints** - Contact form submission and admin APIs  
4. **Email Service** - SMTP integration for notifications
5. **Admin Panel** - Simple React admin interface
6. **Frontend Integration** - Replace mock calls with real API
7. **Testing** - Test all flows end-to-end