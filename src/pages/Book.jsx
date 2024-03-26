import '../css/Book.css';
import '../css/global.css';

function Book() {
  return (
    <div className="Book">
      <header className="global-header">
        <div className="logo-box">
          <img className ="logo" src="../logo_white.png" alt=""></img>
          <h2>电子书城</h2>
        </div>

        <div className="nav-box">
          <a href="../Home">首页</a>
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

      <div className="Book-box">
        <div className='description-box'>
          <div className='book-cover'>
            <img src="../book1.png" alt=""></img>
          </div>
          <div className='book-introduce'>
            <h2>C++ Primer 中文版（第 5 版）</h2>
            <div className='price-box'>
              <p className='text'>售价</p>
              <p className='price symbol'>¥</p>
              <p className='price'>57.5</p>
            </div>
            <p>作者：[美] Stanley B. Lippman / [美] Josée Lajoie / [美]</p>
            <p>出版社：电子工业出版社</p>
            <p>销量：8</p>
            <div className='button-box'>
              <button className='button-buy'>立即购买</button>
              <button className='button-cart'>加入购物车</button>
            </div>
          </div>
        </div>
        <hr/>
        <div className='detail-box'>
          <h3>内容简介</h3>
          <p>&emsp;&emsp;这本久负盛名的 C++ 经典教程，时隔八年之久，终迎来史无前例的重大升级。除令全球无数
            程序员从中受益，甚至为之迷醉的——C++ 大师 Stanley B. Lippman 的丰富实践经验，C++标准委员会原
            负责人 Josée Lajoie 对C++标准的深入理解，以及C+ + 先驱 Barbara E. Moo 在 C++教学方面的真知
            灼见外,更是基于全新的 C++11标准进行了全面而彻底的内容更新。非常难能可贵的是，本书所有示例均全部
            采用C++11 标准改写，这在经典升级版中极其罕见——充分体现了 C++ 语言的重大进展及其全面实践。
            书中丰富的教学辅助内容、醒目的知识点提示，以及精心组织的编程示范，让这本书在 C++ 领域的权威地
            位更加不可动摇。无论是初学者入门，或是中、高级程序员提升，本书均为不容置疑的首选。</p>
          <h3>作者简介</h3>
          <p>&emsp;&emsp;本书所有作者都是著名的C++权威人物。<br/>
            &emsp;&emsp;Stanley B. Lippman目前是微软公司 Visual C++ 团队的架构师。他从1984年开始在贝尔
            实验室与C++的设计者Bjarne Stroustrup一起从事C++的设计与开发。他在迪士尼和梦工厂从事动画制作，
            还担任过JPL的高级顾问。他还著有Inside the C++ Object Model。<br/>
            &emsp;&emsp;Josée Lajoie曾经是IBM加拿大研究中心C/C++编译器开发团队的成员，在ISO C++标准委员
            会工作了7年，担任过ISO核心语言工作组的主席和C++ Report杂志的专栏作家。<br/>
            &emsp;&emsp;Barbara E. Moo是拥有25年软件经验的独立咨询顾问。在AT&T，她与Stroustrup、Lippman
            一起管理过复杂的C++开发项目。她和Andrew Koenig合著了Accelerated C++和Ruminations on C++。</p>
        </div>
        <hr/>
        <div className='comment-box'>
          <div className='comment-title'>
            <h3>书籍评论</h3>
            <a>最新</a>
            <a>|</a>
            <a>最热</a>
          </div>
          <textarea placeholder="写下你的评价"></textarea>
          <button>发布</button>
          <div className='comment-container'>
            <div className='avatar-box'>
              <img src="../user_black.png"></img>
            </div>
            <div className='comment-content'>
              <h4>用户1</h4>
              <p>这是一条评论</p>
              <div className='comment-info'>
                <p className='time'>2024/3/20 20:40</p>
                <img src="../like.png" alt=""></img>
                <p className='like'>0</p>
                <p className='reply'>回复</p>
              </div>
            </div>
          </div>
          <div className='comment-container'>
            <div className='avatar-box'>
              <img src="../user_black.png"></img>
            </div>
            <div className='comment-content'>
              <h4>用户1</h4>
              <p>这是一条评论</p>
              <div className='comment-info'>
                <p className='time'>2024/3/20 20:40</p>
                <img src="../like.png" alt=""></img>
                <p className='like'>0</p>
                <p className='reply'>回复</p>
              </div>
            </div>
          </div>
          <div className="page-box">
            <a className='page-up' href="#"></a>
            <a className='page-num' href="#">1</a>
            <a className='page-down' href="#"></a>
          </div>   
        </div> 
      </div>

      <footer className="global-footer">
        <a href = "https://github.com/EricDChi/online-bookstore">github仓库</a>
        <p>online bookstore</p>
      </footer>
    </div>
  );
}

export default Book;
