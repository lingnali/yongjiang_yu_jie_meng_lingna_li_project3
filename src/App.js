import { Route, Routes, Navigate } from "react-router-dom";
import Books from "./components/Books";
import Header from "./components/Header";
import BookDetail from "./components/BookDetail";
import UserForm from "./components/UserForm";
import ReviewForm from "./components/ReviewForm";
import BookForm from "./components/BookForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/books" />} />
        <Route path="/books">
          <Route path="" element={<Books />} />
          <Route path=":id" element={<BookDetail />} />
          <Route path="new" element={<BookForm />} />
          <Route path="edit" element={<BookForm />} />
          <Route path=":id/reviews" element={<ReviewForm />} />
          <Route path=":id/reviews/:reviewId" element={<ReviewForm />} />
        </Route>
        <Route path="/register" element={<UserForm />} />
        <Route path="/login" element={<UserForm />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
