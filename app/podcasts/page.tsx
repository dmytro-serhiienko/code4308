import { FaSpotify, FaApple } from "react-icons/fa";
import css from "./Podcasts.module.css";
import Link from "next/link";
import { podcastVideos } from "./podcasts";

export default function PodcastsPage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>
          Розмови, які <span>варто почути</span>
        </h1>

        <div className={css.grid}>
          {podcastVideos.map((video) => (
            // Картка з відео та аудіо
            <div key={video.id} className={css.videoItem}>
              {/* відео посилання */}
              <div className={css.videoWrapper} data-lenis-prevent>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className={css.info}>
                {/* назва посилання */}
                <Link
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.videoTitle}
                >
                  {video.title}
                </Link>

                {/* аудіо посилання */}
                <div className={css.audioLinks}>
                  <span className={css.listenOn}>Слухати на:</span>
                  <div className={css.buttonsGroup}>
                    <Link
                      href={video.links.spotify}
                      target="_blank"
                      className={css.audioBtn}
                      title="Spotify"
                    >
                      <FaSpotify /> <span>Spotify</span>
                    </Link>
                    <Link
                      href={video.links.apple}
                      target="_blank"
                      className={css.audioBtn}
                      title="Apple Podcasts"
                    >
                      <FaApple /> <span>Apple</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
