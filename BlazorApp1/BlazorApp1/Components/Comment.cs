namespace BlazorApp1.Components
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
    }
}
