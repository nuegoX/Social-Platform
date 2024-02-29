namespace BlazorApp1.Components
{

    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public int CommentCount { get; set; }
        public int Id2 { get; set; }
    }
}
