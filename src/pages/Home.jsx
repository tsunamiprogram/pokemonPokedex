import { useDispatch } from "react-redux"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setTrainerName(e.target.trainerName.value));
        navigate("/pokedex")
    }
  return (
    <main>
        <section>
            <div>
                <div>
                    <img src="/images/pokedexlogo.png" alt="" />
                </div>
                <h3> Hi Coach!</h3>
                <p>We welcome you to the pokedex trainers club! </p>
                <form onSubmit={handleSubmit}>
                    <input name="trainerName" type="text" placeholder="Your Name"/>
                    <button>Start!</button>
                </form>
            </div>

        </section>
        <footer>

        </footer>
    </main>
  )
}
export default Home