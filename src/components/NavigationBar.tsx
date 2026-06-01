import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ShoppingCartDrawer } from './ShoppingCartDrawer'
import { useState } from 'react'

export const NavigationBar = () => {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky w-full top-0 z-50">
      <nav className="bg-white/90 backdrop-blur-md border-b-4 border-orange-300 py-3">
        <div className="flex flex-wrap items-center justify-between max-w-7xl px-4 mx-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:animate-wag">🐾</span>
            <h1 className="text-xl sm:text-2xl text-orange-400">
              Où est Médor ?
            </h1>
          </Link>

          <div className="flex items-center lg:order-2 gap-1">
            {user ? (
              <Link
                to="/profile"
                className="text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-full text-sm px-5 py-2 shadow-md hover:shadow-lg transition-all"
              >
                Mon profil
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-dark-grey bg-yellow-300 hover:bg-yellow-400 font-medium rounded-full text-sm px-5 py-2 shadow-md hover:shadow-lg transition-all"
              >
                Connexion
              </Link>
            )}
            <ShoppingCartDrawer />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-orange-400 rounded-full lg:hidden hover:bg-orange-100 transition-colors"
              aria-controls="mobile-menu-2"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Menu</span>
              {menuOpen ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          <div className={`${menuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:items-center lg:gap-1 lg:mt-0">
              <li>
                <Link
                  to="categorie/medaille-gravee"
                  className="block py-2 px-4 text-dark-grey rounded-full hover:bg-orange-100 hover:text-orange-400 transition-colors lg:hover:bg-transparent"
                  onClick={() => setMenuOpen(false)}
                >
                  Nos produits
                </Link>
              </li>
              <li>
                <Link
                  to="/le-concept"
                  className="block py-2 px-4 text-dark-grey rounded-full hover:bg-orange-100 hover:text-orange-400 transition-colors lg:hover:bg-transparent"
                  onClick={() => setMenuOpen(false)}
                >
                  Le concept
                </Link>
              </li>
              <li>
                <Link
                  to="/notre-histoire"
                  className="block py-2 px-4 text-dark-grey rounded-full hover:bg-orange-100 hover:text-orange-400 transition-colors lg:hover:bg-transparent"
                  onClick={() => setMenuOpen(false)}
                >
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-4 text-dark-grey rounded-full hover:bg-orange-100 hover:text-orange-400 transition-colors lg:hover:bg-transparent"
                  onClick={() => setMenuOpen(false)}
                >
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}