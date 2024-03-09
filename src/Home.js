import './Home.css';
import './global.css';

function Home() {
  return (
    <div className="Home">
      <header className="Login-header">
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
        <a className="book-box" htrf="#">
          <img src="../book1.png" alt=""></img>
          <p className='title'>C++ Primer 中文版（第 5 版）</p>
          <p className='author'>Stanley B.Lippman</p>
          <p className='price'>¥57.5</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book2.jpg" alt=""></img>
          <p className='title'>地 关于地球的运动</p>
          <p className='author'>鱼丰|漫画</p>
          <p className='price'>¥83.2</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <a className="book-box" htrf="#">
          <img src="../book4.png" alt=""></img>
          <p className='title'>书名</p>
          <p className='author'>作者</p>
          <p className='price'>价格</p>
        </a>
        <div className="page-box">
          <a className='page-up' href="#"></a>
          <a className='page-num' href="#">1</a>
          <a className='page-num' href="#">2</a>
          <a className='page-num' href="#">3</a>
          <a className='page-down' href="#"></a>
        </div>
      </div>

      <footer className="Login-footer">
        <a href = "https://github.com/EricDChi/online-bookstore">github仓库</a>
        <p>online bookstore</p>
      </footer>
    </div>
  );
}

export default Home;
