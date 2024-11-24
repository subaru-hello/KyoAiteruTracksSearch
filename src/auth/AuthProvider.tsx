import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { getCurrentUser } from 'apis/firebase/users';
import { DocumentData } from 'firebase-admin/firestore';

type AuthContextProps = {
  currentUser: User | null | undefined;
  isLoggedIn: boolean | null;
  profile: DocumentData | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  isLoggedIn: false,
  profile: undefined,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [profile, setProfile] = useState<DocumentData | null | undefined>(
    undefined
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // ログイン状態を確認する
  useEffect(() => {
    const _fetchCurrentUser = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const userSnapShot = await getCurrentUser(user.email);
          if (!userSnapShot.empty) {
            const userInfo = userSnapShot.docs[0].data();
            setProfile({ ...userInfo, uid: userSnapShot.docs[0].id });
          } else {
            setProfile(null);
          }
          setCurrentUser(user);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setCurrentUser(null);
        setProfile(null);
        setIsLoggedIn(false);
      }
    };

    _fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, profile, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export const useAuthContext = () => useContext(AuthContext);
