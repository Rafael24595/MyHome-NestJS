import { Controller, Request, Res, Post, UseGuards, Get, Body, Query } from '@nestjs/common';
import { join } from 'path';
import { createReadStream, statSync } from 'fs';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { PathVariables } from "../../utils/Variables";
import { JwtCookieAuthGuard } from './guards/jwt-cookie-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user:{nickname: string, password: string}){
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }

    @UseGuards(JwtCookieAuthGuard)
    @Get('file')
    getTestFile(@Request() req, @Query() filePathQuery: {filePath:string}, @Res() res){
        const filePath = filePathQuery.filePath;
        const relativePath = join(__dirname, PathVariables.private_assets , filePath);
        /*var stat = statSync(relativePath);
        res.set({
            'Content-Type': 'video/mp4',
            'Content-Length': stat.size
        })
        var readStream = createReadStream(relativePath);
        readStream.pipe(res);*/

        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }

        const videoSize = statSync(relativePath).size;

        // Parse Range
        // Example: "bytes=32324-"
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = createReadStream(relativePath, { start, end });

        // Stream the video chunk to the client
        videoStream.pipe(res);

    }
}
