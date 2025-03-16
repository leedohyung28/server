import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { ChartsDTO } from "./dto/create-charts.dto";
import { SpotifyService } from "../musics/spotify.service";
import { LimitDTO } from "./dto/chart-limit.dto";
import { ChartsRepository } from "./charts.repository";

@Injectable()
export class ChartsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly spotifyService: SpotifyService,
    private readonly chartsRepository: ChartsRepository,
  ) {}

  public async getGlobal50(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/6ZkTORGQnmh5ZyVlonudfP/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get Global 50 : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get global 50",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKorea50(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/4cRo44TavIHN54w46OqRVc/tracks";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      // Axios 오류 객체 분해 할당
      const { response, message } = err;

      // Spotify API 응답 오류 상세 출력
      if (response) {
        console.error(`Spotify API Error [${response.status}]:`, {
          url: response.config.url,
          params: response.config.params,
          data: response.data,
        });
      } else {
        console.error("Network Error:", message);
      }

      // 클라이언트에 전달할 에러 메시지 구성
      const errorResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Failed to get Korea 50",
        details: response?.data ?? message,
      };

      throw new HttpException(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getGlobal50Weekly(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/0EN2gQhhn0rCYUR5BY1UJy/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get Global 50 Week : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get global 50 week",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKorea50Weekly(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();
      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 50;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/6kbzPEHj3uMPRFsR3v6xzE/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get Korea 50 Week : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Korea 50 week",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKoreaRecent(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/2Mq9TtE1Hv3c20UvuX3UwB/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get Korea Recent : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Korea Recent",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAnimaRnB(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/46CBfjvYyxkDUIXUzCT3Lj/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get Anima R&B : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Anima R&B",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getJazzforSleep(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/5rdgRwdMskt1IJKjNf0VWQ/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get Jazz for Sleep : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get Jazz for Sleep",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getKpopDance(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/20eYFSDMxKAtZlJH2yacQO/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get K-Pop Dance : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get K-Pop Dance",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAllTimeHighestRated(
    uid: string,
    body: LimitDTO,
  ): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/3090lTTISONgxLxHj7Ni6A/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get All Time Highest Rated Songs : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get All Time Highest Rated Songs",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getTodaysHit(uid: string, body: LimitDTO): Promise<ChartsDTO[]> {
    try {
      const accessToken = await this.spotifyService.getAccessToken();

      const limit =
        typeof body.limit === "string" ? parseInt(body.limit, 10) : 10;

      const offset =
        typeof body.offset === "string" ? parseInt(body.offset, 10) : 0;

      const url =
        "https://api.spotify.com/v1/playlists/0suNxdO0GcLUSjo5whzPQ0/tracks";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit,
          offset,
        },
      });

      const charts = await this.chartsRepository.transformCharts(
        uid,
        response.data.items,
      );
      return charts;
    } catch (err) {
      console.error("Failed to Get All Today's Top Hits : ", err);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to get All Time Today's Top Hits",
          details: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
