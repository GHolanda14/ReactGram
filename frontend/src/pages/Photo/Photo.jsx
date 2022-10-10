import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { getPhotoById } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { photo, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);
  if (loading) {
    return <p>Carregando...</p>;
  }
  return <PhotoItem photo={photo} />;
};

export default Photo;
