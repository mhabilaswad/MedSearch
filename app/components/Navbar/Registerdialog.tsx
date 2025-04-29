import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'  // Import icon centang

const Register = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    setMessage('')
    setIsSuccess(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsSuccess(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage('Email tidak valid. Harus dalam format nama@domain.com')
      return
    }

    // Validasi password (minimal 8 karakter)
    if (password.length < 8) {
      setMessage('Password harus memiliki minimal 8 karakter')
      return
    }

    // Validasi nama tidak boleh kosong
    if (!name.trim()) {
      setMessage('Nama tidak boleh kosong')
      setIsSuccess(false)
      openModal()
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Pendaftaran berhasil!')
        setIsSuccess(true)
        setName('')
        setEmail('')
        setPassword('')
        setTimeout(() => {
          closeModal()
        }, 2000)
      } else {
        setMessage(data.message || 'Pendaftaran gagal.')
      }
    } catch (err) {
      console.error(err)
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
    }
    setLoading(false)
  }

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
        <div className="hidden lg:block">
          <button
            className="text-white bg-[#1C74DB] text-lg font-medium ml-9 py-2 px-6 transition duration-150 ease-in-out rounded-full hover:bg-blue-700"
            onClick={openModal}
          >
            Sign up
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <img
                      className="h-6"
                      src="/assets/logo/logo.png"
                      alt="Your Company"
                    />
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                      {isSuccess ? 'Pendaftaran Berhasil!' : 'Register your account'}
                    </h2>
                    {!isSuccess ? (
                      <form onSubmit={handleRegister} className="w-full space-y-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {message && (
                          <p
                            className={`text-sm text-center ${isSuccess ? 'text-green-600' : 'text-red-500'}`}
                          >
                            {message}
                          </p>
                        )}
                        <button
                          type="submit"
                          disabled={loading}
                          className="relative flex w-full justify-center rounded-md bg-[#1C74DB] py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon
                              className="h-5 w-5 text-blue-300 group-hover:text-white"
                              aria-hidden="true"
                            />
                          </span>
                          {loading ? 'Processing...' : 'Register Now'}
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center space-y-4">
                        <CheckCircleIcon className="h-16 w-16 text-green-600" aria-hidden="true" />
                        <p className="text-xl text-center text-green-600">Pendaftaran Berhasil!</p>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Register
