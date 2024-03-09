import './Login.css';
import './global.css';

function Login() {
  return (
    <div className="Login">
      <header className="Login-header">
        <div className="logo-box">
          <img className ="logo" src="../logo_white.png" alt=""></img>
          <h2>电子书城</h2>
        </div>

        <div className="nav-box">
          <a href="/Home">首页</a>
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

      <div className="Login-box">
        <div className="login-title">
          <img src="../logo.png" alt=""></img>
          <h2>电子书城</h2>
        </div>
        <div className='input-box'>
          <input type="text" placeholder="用户名"></input>
          <input type="password" placeholder="密码"></input>
        </div>
        <a href="#">忘记密码？</a>
        <div className='button-box'>
          <button>登录</button>
          <button>注册</button>
        </div>
      </div>

      <footer className="Login-footer">
        <a href = "https://github.com/EricDChi/online-bookstore">github仓库</a>
        <p>online bookstore</p>
      </footer>
    </div>
  );
}

export default Login;
