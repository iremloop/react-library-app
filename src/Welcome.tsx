function Welcome(props: { isim: string }) {
    return (
      <div>
        <h2>Merhaba {props.isim}</h2>
        <p>React öğrenmeye devam ediyor.</p>
      </div>
    );
  }
  
  export default Welcome;