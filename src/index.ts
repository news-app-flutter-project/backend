import 'source-map-support/register';
import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import {
    NewsController,
    AuthController,
    ProfileController,
    ReaderController,
    SearchController,
    BookmarkController,
    MemoController,
    CommentController,
} from '@/controllers/index';
import { AuthMobileController } from '@/controllers_mobile/index';

validateEnv();
const app = new App({
    controllers: [
        new NewsController(),
        new AuthController(),
        new ProfileController(),
        new ReaderController(),
        new SearchController(),
        new BookmarkController(),
        new MemoController(),
        new CommentController(),
    ],
    mobile_controllers: [new AuthMobileController()],
    port: Number(process.env.PORT),
});

// cron job
// app.schedule_run();

app.bootstrap();
