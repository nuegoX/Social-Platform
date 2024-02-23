namespace BlazorApp1.Components
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public Access Access { get; set; } = Access.User;
    }
    public enum Access
    {
        User,
        Moderator
    }
}
