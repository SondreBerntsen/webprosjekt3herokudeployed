import React from "react";

const AdminPostItem = props => {

  return (
    <React.Fragment>
      <div className="elementCardAdmin row">
        <p className="col-lg-5">
          <span className="smallHeading">Tittel: </span> {props.post.title}
        </p>
        <p className="col-lg-4">
          <span className="smallHeading">Dato: </span> {props.post.date}
        </p>
        <div className="col-lg-3">
          <button className="btn btn-sm btn-danger btnInElementAdmin" onClick={() => { props.handleDelete(props.post.id) }}>
            Slett
          </button>
          <button
            className="btn  btn-secondary btnInElementAdmin btn-sm"
            type="button"
            data-toggle="collapse"
            data-target={"#post" + props.post.id}
            aria-expanded="false"
            aria-controls={"post" + props.post.id}
          >
            Rediger
          </button>
        </div>
      </div>
      <div className="editScheduleItem collapse" id={"post" + props.post.id}>
        <form className="col-md-8 col-lg-6">
          <div className="form-group">
            <label>Tittel</label>
            <input
              type="text"
              className="form-control"
              defaultValue={props.post.title}
            />
          </div>
          <div className="form-group">
            <label>Bilde</label>
            <input type="file" className="form-control" />
          </div>
          {/*If postid is not set no not try to display images*/}
          {props.post.id !== "" ?
            (<img className="newsImgEdit "
              src={require('../../uploadedImg/postImg/' + props.post.id)}
              alt="newsImg" />) : null}
          <div className="form-group">
            <label>Ny Tekst</label>
            <textarea
              id="textareaNews"
              className="form-control"
              defaultValue={props.post.text}
            />
          </div>
          <button type="submit" className="btn btn-info btn-sm">
            Rediger
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AdminPostItem;
