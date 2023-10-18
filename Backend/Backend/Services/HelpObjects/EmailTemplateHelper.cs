namespace Backend.Services.HelpObjects;

public class EmailTemplateHelper
{
    public static string GetJobApplicationConfirmationHtml(string jobTitle)
    {
        return $@"
            <html>
                <body>
                    <h1>Job Application Confirmation</h1>
                    <p>Thank you for applying for the job: {jobTitle}. We have received your application and will be in touch soon.</p>
                </body>
            </html>";
    }

    public static string GetCourseEnrollmentConfirmationHtml(string courseTitle)
    {
        return $@"
            <html>
                <body>
                    <h1>Course Enrollment Confirmation</h1>
                    <p>Congratulations, you have successfully enrolled in the course: {courseTitle}.</p>
                </body>
            </html>";
    }

    public static string GetHiringNotificationHtml(string jobTitle)
    {
        return $@"
            <html>
                <body>
                    <h1>You've been hired!</h1>
                    <p>Congratulations, you have been hired for the job: {jobTitle}.</p>
                </body>
            </html>";
    }

    public static string GetDeclineNotificationHtml()
    {
        return $@"
            <html>
                <body>
                    <h1>Application Declined</h1>
                    <p>We regret to inform you that your application has been declined. Thank you for your interest.</p>
                </body>
            </html>";
    }
}
