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
            <div className="pt-4">
                <div className=" w-full ">
                    <img className=" xxs:max-w-md mx-auto 2xs:max-w-xs " src="/images/pokedexlogo.png" alt="" />
                </div>
                <h1 className=" mx-auto text-5xl text-red-500"> Hello Coach!</h1>
                <p className="text-2xl">To enter, give us your name </p>
                <form className="pt-8 pb-4" onSubmit={handleSubmit}>
                    <input className="shadow-lg pl-4 pr-[200px]" name="trainerName" type="text" placeholder="Your Name"/>
                    <button className="bg-red-500 border-2 border-red-500 rounded px-8 text-white">Start!</button>
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