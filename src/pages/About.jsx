import React from "react";

const About = () => {
  return (
    <div className="about-page">
        <section>
            <h2>About Movielife</h2>
            <p>
                Welcome to my app! This application was built with passion and dedication, aiming to provide a seamless user experience and showcase the skills and knowledge I gained during the development process.
            </p>
            <p>
                The app is designed to search, preview and store movies. It leverages various technologies and tools to deliver a robust and interactive user interface.
            </p>
        </section>
        <section>
            <h3>Key Features</h3>
            <ul>
                <li>Search any movie of your choice</li>
                <li>Review any movie of your choice including their trailers</li>
                <li>create watchList which can store and also remove movies of your choice</li>
            </ul>
        </section>
        <section>
            <h3>Technologies Used</h3>
            <ul>
                <li>React: Movielife app is built using the React library, allowing for efficient component-based development and state management.</li>
                <li>JavaScript (ES6+): The primary programming language used to write the application logic.</li>
                <li>HTML5 & CSS3: The building blocks for structuring and styling the user interface.</li>
                <li>TMDB : TMDB (The Movie Database) is an online database that provides information about movies.</li>
            </ul>
        </section>
        <section>
            <h3>Key Learnings</h3>
            <p>
                Throughout the development of this app, I gained valuable insights and improved my skills in various areas, including:
            </p>
            <ul>
                <li>React component lifecycle and hooks</li>
                <li>Managing and manipulating application state</li>
                <li>Handling user authentication and authorization</li>
                <li>Working with APIs and fetching data</li>
                <li>Styling and layout techniques</li>
                <li>Debugging and troubleshooting</li>
                <li>And many more</li>
            </ul>
        </section>
            <p>
                Thank you for using my app and exploring the features I implemented. I hope you find it useful and enjoy using it as much as I enjoyed building it. If you have any feedback or suggestions, please feel free to reach out!
            </p>
    </div>
  );
};

export default About;
