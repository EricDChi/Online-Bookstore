import '../oldcss/old_home.css';
import '../oldcss/old_global.css';
import { book_page } from '../service/home';

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

        <div className="avatar-box">
          <img className="avatar" src="../user.png" alt=""></img>
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
        <a className="book-box" onClick={book_page}>
          <img src="../book1.png" alt=""></img>
          <p className='title'>C++ Primer 中文版（第 5 版）</p>
          <p className='author'>Stanley B.Lippman</p>
          <p className='price'>¥ 57.5</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book2.jpg" alt=""></img>
          <p className='title'>地 关于地球的运动</p>
          <p className='author'>鱼丰|漫画</p>
          <p className='price'>¥ 83.2</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book3.jpg" alt=""></img>
          <p className='title'>艾欧泽亚百科全书</p>
          <p className='author'>Square Enix|Final Fantasy XIV|游戏设定集</p>
          <p className='price'>¥ 255</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book4.jpg" alt=""></img>
          <p className='title'>穆斯林的葬礼</p>
          <p className='author'>霍达</p>
          <p className='price'>¥ 49</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book5.jpg" alt=""></img>
          <p className='title'>射雕英雄传</p>
          <p className='author'>金庸</p>
          <p className='price'>¥ 94.25</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book6.jpg" alt=""></img>
          <p className='title'>强风吹拂</p>
          <p className='author'>三浦紫苑|日本|小说</p>
          <p className='price'>¥ 38.5</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book7.jpg" alt=""></img>
          <p className='title'>福尔摩斯探案全集</p>
          <p className='author'>亚瑟·柯南·道尔</p>
          <p className='price'>¥ 164</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book8.jpg" alt=""></img>
          <p className='title'>GO专家编程</p>
          <p className='author'>任红彩</p>
          <p className='price'>¥ 87.18</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book9.jpg" alt=""></img>
          <p className='title'>女神异闻录5设定集</p>
          <p className='author'>Atlus|Sega|游戏设定集</p>
          <p className='price'>¥ 208</p>
        </a>
        <a className="book-box" href="#">
          <img src="../book10.jpg" alt=""></img>
          <p className='title'>Chin up！</p>
          <p className='author'>陈奕迅|流行|专辑</p>
          <p className='price'>¥ 184.8</p>
        </a>
        <div className="page-box">
          <a className='page-up' href="#"></a>
          <a className='page-num' href="#">1</a>
          <a className='page-num' href="#">2</a>
          <a className='page-num' href="#">3</a>
          <a className='page-down' href="#"></a>
        </div>
      </div>

      <footer className="global-footer">
        <a href = "https://github.com/EricDChi/online-bookstore">github仓库</a>
        <p>online bookstore</p>
      </footer>
    </div>
  );
}

export default Home;
