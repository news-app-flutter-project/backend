import 'source-map-support/register';
import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import {
    NewsFinalController,
    AuthController,
    ProfileController,
    ReaderController,
    SearchController,
    BookmarkController,
    MemoController,
    CommentController,
} from '@/controllers/index';

validateEnv();
const app = new App({
    controllers: [
        new NewsFinalController(),
        new AuthController(),
        new ProfileController(),
        new ReaderController(),
        new SearchController(),
        new BookmarkController(),
        new MemoController(),
        new CommentController(),
    ],
    port: Number(process.env.port),
    URL: process.env.URL!,
});

// cron job
// app.schedule_run();

app.bootstrap();
