﻿namespace ExampleForum.Models.Response
{
    /// <summary>
    /// Utvald data som ska returneras till API:er för användare
    /// </summary>
    public class UserResponse
    {

        /// <summary>
        /// Användarens ID
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Användarens namn för display på sidan
        /// </summary>
        public string DisplayName { get; set; }

    }
}
