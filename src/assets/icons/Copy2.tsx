const Copy2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M8 10.75C8 9.23046 9.2324 7.99893 10.7519 8L19.7519 8.00635C21.27 8.00742 22.5 9.23832 22.5 10.7563V19.7486C22.5 21.2674 21.2688 22.4986 19.75 22.4986H10.75C9.23122 22.4986 8 21.2674 8 19.7486V10.75Z"
      fill="currentColor"
    />
    <path
      d="M3.75192 1C2.23239 0.998942 1 2.23047 1 3.75V14.7486C1 16.2674 2.23122 17.4986 3.75 17.4986H6.75V10.75C6.75 8.53976 8.54258 6.74844 10.7528 6.75L17.5 6.75476V3.75768C17.5 2.23964 16.27 1.00873 14.7519 1.00768L3.75192 1Z"
      fill="currentColor"
    />
  </svg>
);

export default Copy2;