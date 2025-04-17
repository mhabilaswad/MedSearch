import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const LogoutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleLogout = async () => {
    closeModal();
    await signOut({ callbackUrl: '/' }); // Redirect ke halaman beranda setelah logout
  };

  return (
    <>
<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
  {status === 'authenticated' && (
    <button
      className="bg-[#FF0000] text-white text-lg font-medium ml-9 py-2 px-6 rounded-full transition duration-150 ease-in-out hover:opacity-90"
      onClick={openModal}
    >
      Logout
    </button>
  )}
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
                  <div className="text-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Are you sure you want to log out?
                    </h3>
                    <div className="mt-4 flex justify-center space-x-4">
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-red rounded-md hover:bg-red-700"
                      >
                        Logout
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LogoutDialog;
