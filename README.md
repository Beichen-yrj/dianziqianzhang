# 电子签章系统

基于 Vue 2、Spring Boot、MySQL 和 FISCO BCOS 的电子签章应用，包含用户注册登录、印章生成、文档签章上链、签章记录查询及验签功能。

## 目录

| 目录 | 内容 |
| --- | --- |
| `frontend/` | Vue 2 + Element UI 前端及静态资源 |
| `backend/` | Java 11 / Spring Boot 后端 |
| `contracts/` | 与后端接口配套的 Solidity 0.4.25 合约 |
| `database/` | MySQL 数据库表结构，不包含用户数据 |
| `deploy/` | 前后端 Dockerfile 与 Nginx 配置 |

## 准备区块链

需要独立部署 FISCO BCOS 2.x 和 WeBASE-Front，后端通过 WeBASE-Front 的 `/WeBASE-Front/trans/handle` 接口调用群组 1 的合约。

使用 Solidity 0.4.25 编译 `contracts/ElectronicSeal.sol`（依赖同目录的 `Seal.sol`），在群组 1 部署 `ElectronicSeal`。保存合约地址和部署者地址；`CONTRACT_OWNER_ADDRESS` 必须对应 WeBASE-Front 中可用的部署者签名账户。注册用户使用的区块链账户也需提前在 WeBASE 中创建并可用于调用。

## Docker 启动

安装 Docker Engine / Docker Desktop 和 Compose 插件，在项目根目录执行：

```sh
cp .env.example .env
```

Windows PowerShell 可用 `Copy-Item .env.example .env`。编辑 `.env`，填写数据库密码、MySQL root 密码、至少 32 个字符的随机 JWT 密钥、合约地址、部署者地址及 WeBASE-Front 接口地址。`.env` 仅保存在本地。

```sh
docker compose up -d --build
```

访问 `http://localhost:8020`。数据库会在首次创建数据卷时自动导入表结构，链服务需要自行准备。容器默认通过 `host.docker.internal` 访问宿主机 WeBASE-Front，可按实际部署修改 `WEBASE_TRANS_URL`。

## 本地开发

准备 Node.js 22、JDK 11、Maven 3.9、MySQL 8 和上述链服务。

1. 创建 `electronicseal` 数据库，导入 `database/schema.sql`。该脚本会重建同名表，应在空库执行。
2. 在启动后端的终端设置环境变量 `DB_PASSWORD`、`JWT_SECRET`、`CONTRACT_ADDRESS`、`CONTRACT_OWNER_ADDRESS` 和 `WEBASE_TRANS_URL`；可选设置 `DB_USERNAME`（默认 `electronicseal`）和 `DB_URL`（默认连接本机 `electronicseal` 数据库）。根目录 `.env` 由 Docker Compose 读取，本地 Maven 启动时需自行导出环境变量。
3. 启动后端：

   ```sh
   cd backend
   mvn spring-boot:run
   ```

4. 在另一个终端启动前端：

   ```sh
   cd frontend
   npm ci
   npm run serve
   ```

前端地址为 `http://localhost:8020`，开发代理将 `/api` 请求转发到 `http://localhost:8080`。后端 Swagger 地址为 `http://localhost:8080/swagger-ui.html`。

## 构建

```sh
cd frontend
npm run build
```

```sh
cd backend
mvn -DskipTests package
```

设置 `JWT_SECRET` 后，可在 `backend/` 执行 `mvn -Dtest=TokenUtilTests test`，验证令牌签名及篡改拒绝。完整执行 `mvn test` 前需配置可用的数据库和环境变量，以运行 Spring 上下文测试。完整业务验证还需可用的链环境。
