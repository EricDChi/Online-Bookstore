import './Home.css';
import './global.css';

function Home() {
  return (
    <div className="Home">
      <header className="global-header">
        <div className="logo-box">
          <img className ="logo" src="../logo_white.png" alt=""></img>
          <h2>电子书城</h2>
        </div>

        <div className="nav-box">
          <a href="#">首页</a>
          <a href="#">排行</a>
          <a href="#">分类</a>
        </div>

        <div className="search-box">
          <input type="text" placeholder="搜索书籍"></input>
          <button>搜索</button>
        </div>

        <div className="icon-box">
          <img className="round-icon" src="../user.png" alt=""></img>
        </div>

        <div className="tool-box">
          <a href="#">
            <img src="../message.png" alt=""></img>
            <br/>
              消息
          </a>
          <a href="#">
            <img src="../cart.png" alt=""></img>
            <br/>
              购物车
          </a>
          <a href="#">
            <img src="../order.png" alt=""></img>
            <br/>
              订单
          </a>
        </div>
      </header>

      <div className="Home-box">
        
      </div>

      <footer className="global-footer">
        <a href = "https://github.com/EricDChi/online-bookstore">github仓库</a>
        <p>online bookstore</p>
      </footer>
    </div>
  );
}

export default Home;
