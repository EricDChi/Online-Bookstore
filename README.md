# 电子书城

该repo为上海交通大学课程“互联网应用开发技术“课程项目

目前完成了前端大部分开发及后端主页和搜索

## 运行项目

**数据库**

在命令行输入指令运行MySQL脚本创建数据库

```
mysql -u root -p
// 输入密码
source book_store.sql路径
```

修改后端工程中Backend-Bookstore/src/main/resources/application.properties中password一行

**前端**

在Fronend-BookStore目录下打开命令行输入以下命令运行前端工程

```
npm start
```

**后端**

在idea中添加run configuration添加com.bookstore.backendbookstore.BackendBookstoreApplication后即可运行后端工程
