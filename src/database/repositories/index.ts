import 'source-map-support/register';
import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import {
    NewsFinalController,
    AuthController,
    ProfileController,
    ReaderController,
    SearchController,
    BookmarkController,
    MemoController,
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
    ],
    port: Number(process.env.PORT),
});

// cron job
// app.schedule_run();

app.bootstrap();
