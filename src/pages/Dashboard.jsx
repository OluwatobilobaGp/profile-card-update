import { reactLogo } from "../assets/index";

export default function Dashboard() {

  const courses = [
        {
            image: reactLogo,
            category: "Development",
            title: "Web Development Masterclass",
            lessons: "24 Lessons",
            students: "120 Students",
        },
        {
            image: reactLogo,
            category: "Design",
            title: "UI/UX Design Complete Course",
            lessons: "18 Lessons",
            students: "95 Students",
        },
        {
            image: reactLogo,
            category: "Marketing",
            title: "Digital Marketing Fundamentals",
            lessons: "21 Lessons",
            students: "150 Students",
        },
    ];

  return (
    <>
      {/* ================= POPULAR COURSES ================= */}
      <section className="popular-courses-section">
        <div className="popular-courses-container">

          <div className="popular-courses-heading">
            <div>
              <span className="section-small-label">
                OUR COURSES
              </span>

              <h2>
                Our Popular
                <br />
                Courses For You
              </h2>
            </div>

            <a href="#courses" className="all-courses-link">
              View All Courses
              <span>↗️</span>
            </a>
          </div>

          <div className="courses-grid">
            {courses.map((course, index) => (
              <article className="course-card" key={index}>

                <div className="course-image">
                  <img src={course.image} alt={course.title} />

                  <span className="course-category">
                    {course.category}
                  </span>
                </div>

                <div className="course-content">

                  <h3>{course.title}</h3>

                  <div className="course-info">
                    <span>
                      ◷ {course.lessons}
                    </span>

                    <span>
                      ♙ {course.students}
                    </span>
                  </div>

                  <div className="course-bottom">

                    <span className="course-price">
                      $49
                    </span>

                    <button className="course-button">
                      →
                    </button>

                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
