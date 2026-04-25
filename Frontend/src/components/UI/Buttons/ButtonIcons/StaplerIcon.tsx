import styles from './buttonIcon.module.css'

type TriplebarIconProps = {
  size?: number
}

function StaplerIcon({ size = 30 }: TriplebarIconProps) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 25 35"
      width={size}
      height={size}
      color="white"
    >
    
    <path fillRule="evenodd" clipRule="evenodd" d="M5.68222 18.9956L13.2584 11.4195L14.2012 12.3623L6.62503 19.9384L5.68222 18.9956Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.19638 21.5097L15.7725 13.9335L16.7153 14.8763L9.13919 22.4525L8.19638 21.5097Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.5392 26.8523L21.1153 19.2762L22.0581 20.219L14.482 27.7951L13.5392 26.8523Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.0528 29.3664L23.629 21.7902L24.5718 22.733L16.9956 30.3092L16.0528 29.3664Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.053 29.3665C13.4379 31.9816 9.20739 31.991 6.60389 29.3875C4.0004 26.784 4.00982 22.5535 6.62494 19.9384L5.68213 18.9956C2.54399 22.1337 2.53268 27.2103 5.65688 30.3345C8.78107 33.4587 13.8577 33.4474 16.9958 30.3093L16.053 29.3665Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M21.1151 19.2762L22.0579 20.219C24.4986 17.7782 24.5074 13.8297 22.0775 11.3998C19.6476 8.96985 15.6991 8.97864 13.2583 11.4194L14.2011 12.3622C16.1189 10.4445 19.2213 10.4376 21.1305 12.3468C23.0397 14.256 23.0328 17.3584 21.1151 19.2762Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.19629 21.51C6.45288 23.2534 6.4466 26.0738 8.18226 27.8094C9.91792 29.5451 12.7383 29.5388 14.4817 27.7954L13.5389 26.8526C12.3185 28.073 10.3442 28.0774 9.12928 26.8624C7.91431 25.6475 7.91871 23.6732 9.1391 22.4528L8.19629 21.51Z" fill="currentColor"/>

    </svg>
  )
}
export default StaplerIcon