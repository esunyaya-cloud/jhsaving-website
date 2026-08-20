# Cloudflare Pages 自动部署指南（Git 集成 + 自定义域名）

> 仓库：`esunyaya-cloud/jhsaving-website` (GitHub)
> 域名：`jhsaving.com` (阿里云注册)

---

## 前置条件

- [x] GitHub 仓库已创建：https://github.com/esunyaya-cloud/jhsaving-website
- [ ] Cloudflare 账号（没有就去 https://dash.cloudflare.com/sign-up 注册，免费）
- [ ] 域名 DNS 管理权限（阿里云域名控制台）

---

## 第一步：注册 Cloudflare（2 分钟）

1. 打开 https://dash.cloudflare.com/sign-up
2. 输入邮箱 + 设置密码
3. 验证邮箱后登录

---

## 第二步：添加域名到 Cloudflare（5 分钟）

> 这一步让 Cloudflare 管理 `jhsaving.com` 的 DNS，这样绑定 Pages 域名时无需手动加记录。

1. 登录后，左侧菜单点 **Websites**（网站）
2. 点 **Add a site**（添加站点）→ 输入 `jhsaving.com`
3. 选 **Free** 免费计划 → 点 Continue
4. Cloudflare 会扫描现有 DNS 记录并自动导入
5. 页面显示两个 Cloudflare NS（类似）：
   ```
   xxx.ns.cloudflare.com
   yyy.ns.cloudflare.com
   ```
   **复制这两个 NS 地址**

---

## 第三步：到阿里云修改 NS（3 分钟）

1. 登录阿里云控制台 → **域名** → 找到 `jhsaving.com`
2. 点击域名 → 左侧菜单 **DNS 修改** → **修改 DNS 服务器**
3. 把默认的阿里云 NS（`dns1.hichina.com` / `dns2.hichina.com`）替换为 Cloudflare 给的两个 NS
4. 保存
5. 回到 Cloudflare，点 **Check nameservers** → 等待生效（通常 10-30 分钟，最长 24 小时）
6. Cloudflare 控制台显示 **Active** 表示生效

---

## 第四步：创建 Pages 项目并绑定 Git（5 分钟）

1. Cloudflare 控制台左侧菜单点 **Workers & Pages**
2. 点 **Create** → 选 **Pages** 标签 → **Connect to Git**
3. 首次会弹出 GitHub 授权页面：
   - 点 **Authorize Cloudflare** → 选择 **Only select repositories**
   - 下拉选 `esunyaya-cloud/jhsaving-website` → 点 **Install & Authorize**
4. 回到 Cloudflare，选 `jhsaving-website` 仓库 → 点 **Begin setup**

---

## 第五步：配置构建设置（1 分钟）

| 配置项 | 填写内容 | 说明 |
|---|---|---|
| Project name | `jhsaving` | 项目名（决定你的 `xxx.pages.dev` 子域名） |
| Production branch | `main` | 主分支，push 到 main 自动部署生产环境 |
| Framework preset | **None** | 纯静态站，无需框架 |
| Build command | **留空** | 不需要构建 |
| Build output directory | `.` （一个点） | 当前目录就是输出目录 |
| Root directory | 留空 | 默认根目录 |

填完后点 **Save and Deploy** → Cloudflare 立即开始第一次部署。

---

## 第六步：验证部署（2 分钟）

1. 部署完成后（通常 30 秒内），页面显示 ✅ Success
2. 你会得到一个预览地址：`https://jhsaving.pages.dev`
3. 点开查看，网站应该完整显示

---

## 第七步：绑定自定义域名 jhsaving.com（3 分钟）

> 前提：第三步的 NS 已生效（Cloudflare 状态为 Active）

1. 进入 Pages 项目 → **Custom domains** 标签
2. 点 **Set up a custom domain** → 输入 `www.jhsaving.com` → Continue
3. Cloudflare 自动添加 CNAME 讕录（因为 DNS 已托管在 CF，无需手动操作）
4. 再添加一个 `jhsaving.com`（裸域名）→ Cloudflare 会自动添加 CNAME Flatten 记录
5. 等 1-2 分钟，两个域名都显示 ✅ Active
6. HTTPS 证书自动签发（Cloudflare 自带免费 SSL）

现在访问：
- `https://www.jhsaving.com` ✅ 网站上线
- `https://jhsaving.com` ✅ 自动跳转到 www

---

## 第八步：提交 Google Search Console（SEO 必须）

1. 打开 https://search.google.com/search-console
2. 添加资源 → 输入 `https://www.jhsaving.com`
3. 选 **CNAME 验证**（因为 DNS 在 Cloudflare）→ 复制验证值
4. Cloudflare DNS → 添加 TXT 记录 → 值粘贴验证值
5. 回 Search Console 点验证
6. 提交 sitemap：在 Search Console 左侧 **Sitemaps** → 输入 `sitemap.xml` → 提交

---

## 日常更新流程（自动部署）

以后改网站内容，只需要：

```bash
cd "E:\第一部分\website"
git add -A
git commit -m "说明改了什么"
git push
```

`git push` 后 Cloudflare 自动触发构建部署，约 30 秒后线上版本更新。**不需要任何手动操作。**

---

## 常见问题

### Q: NS 修改后多久生效？
A: 通常 10-30 分钟。Cloudflare 会发邮件通知。

### Q: 部署失败怎么办？
A: 在 Cloudflare Pages 项目 → **Deployments** → 点失败的部署 → 查看构建日志。纯静态站一般不会失败。

### Q: 如何回滚到旧版本？
A: Cloudflare Pages → Deployments → 找到之前的成功部署 → 点 **⋯** → **Rollback to this deployment**。

### Q: 域名访问显示 522 错误？
A: 检查 NS 是否已生效（Cloudflare 状态为 Active），如果还是 Pending，等 NS 传播完成。

### Q: 要不要在 Cloudflare 里也加 A 记录？
A: 不需要。Pages 绑定域名时 Cloudflare 自动处理所有 DNS 记录。
