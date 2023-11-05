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
    <main className="h-screen grid grid-rows-[1fr_auto] ">
        <section className="grid place-content-center text-center">
            <div>
                <div>
                    <img src="/images/pokedexlogo.png" alt="" />
                </div>
                <h3> Hi Coach!</h3>
                <p>We welcome you to the pokedex trainers club! </p>
                <form onSubmit={handleSubmit}>
                    <input className="shadow-lg" name="trainerName" type="text" placeholder="Your Name"/>
                    <button>Start!</button>
                </form>
            </div>

        </section>
        <footer >   
            <div className="bg-red-600 h-16 "></div>
            <div className="bg-black h-12 relative">
               <div className="h-[70px] w-[70px] bg-white border-8 border-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
                <div className="w-9 h-9 rounded-full bg-slate-700 border-[6px] border-black"></div>
                </div> 
            </div>
        </footer>
    </main>
  )
}
export default Home