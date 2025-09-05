import style from './Map.module.css'

export default function Map() {

    return (<section className={style["Map"]}>
        
          <div class={style["embed-map-responsive"]}>
            <div class={style["embed-map-container"]}>
              <iframe
                class={style["embed-map-frame"]}
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Weija&t=&z=13&ie=UTF8&iwloc=B&output=embed"
              ></iframe>
              <a
                href="https://sprunkiretake.net"
                style={{
                  fontSize: "2px",
                  color: "gray",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
                  maxHeight: "1px",
                  overflow: "hidden",
                }}
              >
                sprunki retake
              </a>
            </div>
          </div>
    </section>
    );
}