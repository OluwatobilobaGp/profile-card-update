import { avatarImage, coverImage, profilePicture } from "./assets"
import FirstCard from "./components/FirstCard"
import ProfileCard from "./components/ProfileCard"

function App() {

  const ProfileCards = [
    {
      name: "OluwatobilobaGp",
      role: "FullStack Developer",
      avatarImage: { profilePicture },
      coverImage: { coverImage },
      badge: "Dev",
      badgeImage: "☑",
      rating: "5.0",
      price: "NGN 1000,000",
      hour: "1 hour",
      period: "summer",
      dark: true
    },
    {
      name: "Mr tobi",
      role: "FullStack Developer",
      avatarImage: { avatarImage },
      coverImage: { coverImage },
      badge: "Dev",
      badgeImage: "☑",
      rating: "5.0",
      price: "NGN 1000,000",
      hour: "1 hour",
      period: "summer",
      dark: true
    }
  ]

  return (
    <>
      <h1>OluwatobilobaGp</h1>

      {ProfileCards.map((profilecard, index) => (
        <ProfileCard
          key={index}
          name={profilecard.name}
          role={profilecard.role}
          avatarImage={profilecard.avatarImage}
          coverImage={profilecard.coverImage}
          badge={profilecard.badge}
          badgeImage={profilecard.badgeImage}
          rating={profilecard.rating}
          price={profilecard.price}
          hour={profilecard.hour}
          period={profilecard.period}
          dark={profilecard.dark}
        />
      ))}

      <FirstCard />


    </>
  )
}

export default App
