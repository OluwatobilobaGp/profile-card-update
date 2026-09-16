import { avatarImage, coverImage, profilePicture } from "./assets"
import Card from "./components/Card"
import Dashboard from "./components/Dashboard"
import FirstCard from "./components/FirstCard"
import LoginPage from "./components/LoginPage"
import ProfileCard from "./components/ProfileCard"
import { useState } from "react";
import Todo from "./components/Todo"
import { ProductCard } from "./components/ProductCard"

function App() {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

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

  const isLogin = true;

  return (
    <>
      <h1>OluwatobilobaGp GlobalTech</h1>
      <h2>Ikorodu Branch </h2>

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

      {/* <FirstCard /> */}

      {isLogin && <p>Welcome back, OluwatobilobaGp</p>}

      {isLogin ? <p> You are logged In </p> : <p> You are not logged In </p>}

      {isLogin ? <Dashboard />  : <LoginPage />}

      <button onClick={ () => { setCount(count + 1); console.log(count);  } }>
        CLick Me
      </button>

      <div>{count}</div>


      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

      <div>{text}</div>

      <Card title="Headline">
        {/* children */}
        <p> lorem ipsum dolor sit amet </p>
        <FirstCard />
        
        <form action="">
          <input type="text" name="" id="" />
        </form>
      </Card>

      <Todo />

      <ProductCard productId={2} />
      <ProductCard productId={4} />

    </>
  )
}

export default App
