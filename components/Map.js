export default function Map() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl w-full">
        <h4 className="text-4xl font-semibold text-center mb-8 text-gray-900 mt-4">
          แผนที่วิทยาลัยเทคนิคเชียงใหม่
        </h4>
        <div
          className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-300 mx-auto mt-5"
          style={{ height: '500px', maxWidth: '700px' }}
        >
          <iframe
            style={{ width: '100%', height: '100%' }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.117810955573!2d98.98134437593167!3d18.792902360797466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3a9a71d80adf%3A0xe41f657fc5052416!2z4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LiZ4Li04LiE4LmA4LiK4Li14Lii4LiH4LmD4Lir4Lih4LmI!5e0!3m2!1sth!2sth!4v1751437940137!5m2!1sth!2sth"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
