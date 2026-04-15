import css from "./Podcasts.module.css";

const podcastVideos = [
  {
    id: "7AaNjMUxXmQ",
    title: "Дмитро «Ґвар» Грекович: про шлях воїна та нову реальність",
    url: "https://www.youtube.com/watch?v=7AaNjMUxXmQ",
  },
  {
    id: "_qVsAlaykp4",
    title: "Кирило «Масло» Масалітін: розмова про цінності та майбутнє",
    url: "https://www.youtube.com/watch?v=_qVsAlaykp4",
  },
];

export default function PodcastsPage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Подкасти</h1>

        <div className={css.grid}>
          {podcastVideos.map((video) => (
            <div key={video.id} className={css.videoItem}>
              <div className={css.videoWrapper}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className={css.videoTitle}
              >
                {video.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
