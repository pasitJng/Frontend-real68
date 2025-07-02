export default function Card() {
  return (
    <main className="container-fluid my-4">
        
        <div className="row">
            <h2 className="pt-28 text-6xl font-bold text-center g-2">
                รวมรูปเด็กโหด 3 คน
            </h2>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
            <div className="col">
            <div className="card">
                <img
                src="/image/Card/babyLeo.png"
                className="card-img-top"
                alt="..."
                />
                <div className="card-body">
                <p className="card-text">รูปของเด็กโหด.</p>
                </div>
            </div>
            </div>

            <div className="col">
            <div className="card">
                <img
                src="/image/Card/babyLeo.png"
                className="card-img-top"
                alt="..."
                />
                <div className="card-body">
                <p className="card-text">รูปของเด็กโหด.</p>
                </div>
            </div>
            </div>

            <div className="col">
            <div className="card">
                <img
                src="/image/Card/babyLeo.png"
                className="card-img-top"
                alt="..."
                />
                <div className="card-body">
                <p className="card-text">รูปของเด็กโหด.</p>
                </div>
            </div>
            </div>
        </div>
    </main>
  );
}
