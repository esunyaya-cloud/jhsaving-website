# jhsaving.com 域名部署上线指南（阿里云 DNS）

> 本文档指导你将 `jhsaving.com` 域名绑定到 Cloudflare Pages 或 Netlify，实现正式上线 + 免费 HTTPS + 全球 CDN。

---

## 方案 A：Cloudflare Pages（推荐）

### 优点
- 完全免费（无限带宽 + 无限请求）
- 全球 CDN 加速（国内访问也较快）
- 自动 HTTPS 证书
- SEO 友好（纯静态，加载极快）
- 自带 DDoS 防护

### 第一步：注册 Cloudflare 账号

1. 打开 https://dash.cloudflare.com/sign-up
2. 用邮箱注册（免费计划即可）

### 第二步：将域名添加到 Cloudflare

1. 登录 Cloudflare → 点击左侧 **Websites**
2. 点击 **Add a site** → 输入 `jhsaving.com` → 选 **Free** 计划
3. Cloudflare 会自动扫描现有 DNS 记录（可以忽略）
4. 点击 **Continue** → Cloudflare 会显示两个 Name Server，类似：
   ```
   xxx.ns.cloudflare.com
   yyy.ns.cloudflare.com
   ```
   **记下这两个地址**（每个用户分配的不同）

### 第三步：到阿里云修改 DNS 服务器（关键步骤）

1. 登录阿里云域名控制台：https://dc.console.aliyun.com/ndomain/domain/list
2. 找到 `jhsaving.com` → 点击域名进入详情
3. 左侧菜单 → **DNS 修改** 或 **DNS 服务器修改**
4. 点击 **修改 DNS 服务器**
5. 将默认的阿里云 DNS（类似 `dns1.hichina.com`）替换为 Cloudflare 给的两个：
   ```
   主 DNS 服务器：  xxx.ns.cloudflare.com
   辅助 DNS 服务器：yyy.ns.cloudflare.com
   ```
6. 点击 **确认修改**
7. ⚠️ 注意：阿里云会提示 DNS 生效需要 2-48 小时，实际通常 10-30 分钟

### 第四步：验证 DNS 生效

1. 等 10-30 分钟后回到 Cloudflare 控制台
2. Cloudflare 会自动检测到 DNS 已切换 → 状态变为 **Active**
3. 收到 Cloudflare 邮件 "Your domain is now on Cloudflare!"
4. 也可用以下命令验证：
   ```bash
   nslookup jhsaving.com
   # 如果返回 Cloudflare 的 IP，说明已生效
   ```

### 第五步：部署网站到 Cloudflare Pages

1. 打开 Cloudflare 控制台 → 左侧 **Workers & Pages**
2. 点击 **Create** → 选 **Pages** → 选 **Direct Upload**
3. 项目名称：`jhsaving`（随便取）
4. 将 `E:\第一部分\website` 文件夹中的 **所有文件** 拖拽上传
   - 注意：上传的是文件夹里面的内容，不是文件夹本身
   - 确保 `index.html` 在根目录
5. 点击 **Deploy site** → 等待几秒钟
6. 部署成功后会得到一个预览地址：`https://jhsaving.pages.dev`

### 第六步：绑定自定义域名

1. 在 Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入 `www.jhsaving.com` → 点击 **Continue**
3. Cloudflare 会自动添加 CNAME 记录（因为你已经用了 Cloudflare DNS）
4. 等几秒钟 → 状态变为 **Active**
5. 再添加根域名：
   - 输入 `jhsaving.com` → Cloudflare 会自动添加 CNAME Flattening 记录
   - 状态也会变为 **Active**

### 第七步：验证 HTTPS

1. 浏览器打开 https://www.jhsaving.com → 网站正常显示
2. 地址栏显示锁头 → HTTPS 证书已自动签发
3. 同时访问 https://jhsaving.com → 自动跳转到 www 版本

---

## 方案 B：Netlify（备选，DNS 留在阿里云）

### 优点
- 免费 100GB/月带宽
- 自动 HTTPS
- 部署极简（拖拽上传）

### 第一步：注册 Netlify 账号

1. 打开 https://app.netlify.com/signup
2. 用 GitHub / 邮箱注册

### 第二步：部署网站

1. 登录 Netlify → **Sites** → **Add new site** → **Deploy manually**
2. 将 `E:\第一部分\website` 文件夹的内容拖拽到上传区
3. 部署完成 → 得到预览地址：`https://xxx-xxx-xxx.netlify.app`

### 第三步：到阿里云配置 DNS

1. 登录阿里云 DNS 控制台：https://dns.console.aliyun.com
2. 进入 `jhsaving.com` 域名的解析管理
3. 添加以下记录：

   **CNAME 记录（www 子域名）：**
   | 记录类型 | 主机记录 | 记录值 | TTL |
   |---|---|---|---|
   | CNAME | www | `xxx-xxx-xxx.netlify.app`（替换为你的 Netlify 地址） | 10分钟 |

   **A 记录（根域名跳转到 www）：**
   | 记录类型 | 主机记录 | 记录值 | TTL |
   |---|---|---|---|
   | A | @ | `75.2.60.5` | 10分钟 |
   | A | @ | `3.14.12.207` | 10分钟 |

   > 以上 IP 是 Netlify 的负载均衡 IP，用于根域名支持。

4. 保存 → 等 5-10 分钟生效

### 第四步：在 Netlify 绑定域名

1. Netlify → 你的站点 → **Domain settings** → **Add a domain**
2. 添加 `www.jhsaving.com` 和 `jhsaving.com`
3. Netlify 会验证 DNS 配置 → 通过后自动签发 HTTPS 证书
4. 设置主域名：将 `www.jhsaving.com` 设为 Primary domain
5. 开启 **HTTPS** → Netlify Let's Encrypt 自动签发

---

## 上线后的 SEO 必做步骤

### 1. 提交 sitemap 到 Google Search Console
1. 打开 https://search.google.com/search-console
2. 添加资源 → 输入 `https://www.jhsaving.com`
3. 验证域名所有权（DNS TXT 记录验证）
4. 提交 sitemap → 输入 `sitemap.xml` → 提交

### 2. 提交 sitemap 到 Bing Webmaster Tools
1. 打开 https://www.bing.com/webmasters
2. 添加网站 → 输入 `https://www.jhsaving.com`
3. 提交 `sitemap.xml`

### 3. 测试结构化数据
1. 打开 https://search.google.com/test/rich-results
2. 输入 `https://www.jhsaving.com` → 测试 → 确认 Product / FAQPage / LocalBusiness 等 schema 全部通过

### 4. 检查移动端适配
1. 打开 https://search.google.com/test/mobile-friendly
2. 输入 `https://www.jhsaving.com` → 确认移动端友好

### 5. 测试页面速度
1. 打开 https://pagespeed.web.dev
2. 输入 `https://www.jhsaving.com` → 查看 Core Web Vitals 评分

---

## 两种方案对比

| 对比项 | Cloudflare Pages | Netlify |
|---|---|---|
| 月费 | 免费 | 免费 |
| 带宽 | 无限 | 100GB/月 |
| DNS 管理 | 需迁移到 Cloudflare | 保留在阿里云 |
| 部署方式 | 拖拽上传 | 拖拽上传 |
| HTTPS | 自动 | 自动 |
| 国内速度 | 较快 | 一般 |
| 操作复杂度 | 中等（需改 NS） | 简单（加 CNAME） |
| 推荐指数 | ★★★★★ | ★★★★ |

---

## 常见问题

**Q: DNS 修改后多久生效？**
A: 阿里云修改 NS 后通常 10-30 分钟生效，最长 48 小时。CNAME 记录通常 5-10 分钟生效。

**Q: 为什么 www 能访问但根域名不行？**
A: Cloudflare 用 CNAME Flattening，Netlify 用 A 记录。如果根域名还没生效，等 DNS 传播完即可。

**Q: HTTPS 证书要钱吗？**
A: 不用。Cloudflare 和 Netlify 都自动免费签发 Let's Encrypt 证书。

**Q: 之后更新网站内容怎么办？**
A: Cloudflare Pages：进入项目 → Create new deployment → 重新上传文件夹。Netlify 同理。也可配置 Git 自动部署。
