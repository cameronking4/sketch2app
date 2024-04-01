import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-between align-center items-center w-full border-t mt-5 mb-2 px-3 py-4 sm:py-2">
     <p>{`Copyright ${new Date().getFullYear()} | All Rights Reserved`}</p>
      <div className="flex space-x-4 items-center">
        <Link
          href="https://linkedin.com/in/cameronyking"
          className="group"
          aria-label="Linkedin"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </Link>
        <Link
          href="https://github.com/cameronking4/sketch2app"
          className="group"
          aria-label="GitHub"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
        </Link>
      </div>
  
        {/* <Link href="https://marketplace.visualstudio.com/items?itemName=Sketch2App.sketch2app" target='blank' className="group">
          <div className="flex items-center space-x-2">
          <h1 className="h-6 w-full fill-slate-500 group-hover:fill-slate-700">
            Install VS Code Extension
          </h1>
          <div className='w-6 h-6 mt-2'>
            <img src='https://media4.giphy.com/media/SS8CV2rQdlYNLtBCiF/giphy.gif?cid=ecf05e47kvjh7dofa849yjvx9gowa0088yl0ilulog8aw3yv&ep=v1_gifs_search&rid=giphy.gif&ct=g'/>
          </div>
          </div>
        </Link> */}
          <div className="m-4 h-12 items-center justify-center align-center">
            <a href="https://www.futurepedia.io/tool/sketch2app?utm_source=sketch2app_embed">
              <div className="w-full h-full flex justify-center items-center">
                <img src="https://www.futurepedia.io/api/image-widget?toolId=90af35d4-bb76-4223-ad12-c4ed4b2a0499" alt="Sketch2App | Featured on Futurepedia" className="max-w-full max-h-full object-contain"/>
              </div>
            </a>
          </div>
      
    </footer>
  );
}
