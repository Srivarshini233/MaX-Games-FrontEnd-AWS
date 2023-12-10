import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameNav from './Layout/UserLeftbar';
import { userGameAdd } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Addgame() {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const usernameX = localStorage.getItem('Usernamex');
  const navigate = useNavigate();
  const [game, setGame] = useState({
    gamename: '',
    releaseyear: '',
    gamedeveloper: '',
    gametype: 'Action',
    gameratings: '',
    gameprice: '',
    gamedesc: '',
    gamecover: '',
    coverurl1: '',
    coverurl2: '',
    coverurl3: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 5000);
    const toaster = toast.loading("Adding Game ...", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      isLoading: false
    })
    userGameAdd(usernameX, game)
      .then((res) => {
        toast.update(toaster, { render: "Game Added !", type: "success", isLoading: false });
        setTimeout(() => {
          navigate("/dashboard/games");
        }, 2000);
      })
      .catch((err) => {
        toast.update(toaster, { render: "Failed to add Game !", type: "error", isLoading: false });
      });
  };
  const handleChange = (e) => {
    setGame((prevGame) => ({ ...prevGame, [e.target.name]: e.target.value, }));
  };
  console.log(game)
  return (
    <>
      <div className='game-x-main'>
        <GameNav />
        <div className='game-actions'>
          <h1 className="game-page-title">Add Games </h1>
          <div className="data-x-game-container ">
            <form onSubmit={handleSubmit} className='input-group'>
              <label>
                Game Name :
                <input type="text" name="gamename" value={game.gamename} onChange={handleChange} required />
              </label>
              <label>
                Release Year :
                <input type="number" name="releaseyear" value={game.releaseyear} onChange={handleChange} required />
              </label>
              <label>
                Developer :
                <input type="text" name="gamedeveloper" value={game.gamedeveloper} onChange={handleChange} required />
              </label>
              <label>
                Type :
                <span className="select-dropdown">
                  <select name="gametype" value={game.gametype} onChange={handleChange} required>
                    <option value="Action" selected='true'>Action</option>
                    <option value="OpenWorld">OpenWorld</option>
                    <option value="Sports">Sports</option>
                    <option value="Racing">Racing</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Survival">Survival</option>
                  </select>
                </span>
              </label>
              <label>
                Ratings :
                <input type="number" name="gameratings" value={game.gameratings} onChange={handleChange} required />
              </label>
              <label>
                Price :
                <input type="number" name="gameprice" value={game.gameprice} onChange={handleChange} required />
              </label>
              <label>
                Describption :
                <input type="text" name="gamedesc" value={game.gamedesc} onChange={handleChange} required />
              </label>
              <label>
                Cover Image:
                <input type="text" name="gamecover" value={game.gamecover} onChange={handleChange} required />
              </label>
              <label>
                Cover URL 1 :
                <input type="text" name="coverurl1" value={game.coverurl1} onChange={handleChange} required />
              </label>
              <label>
                Cover URL 2 :
                <input type="text" name="coverurl2" value={game.coverurl2} onChange={handleChange} required />
              </label>
              <label>
                Cover URL 3 :
                <input type="text" name="coverurl3" value={game.coverurl3} onChange={handleChange} required />
              </label>
              <button type="submit" className='game-nav-button'disabled={isButtonDisabled}>Save</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </>
  )
}
