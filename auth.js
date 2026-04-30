import jwt from 'jsonwebtoken';

const JWT_SECRET = 'foobar'; // 솔트 값
// const JWT_EXPIRES_IN = '';

const verifyToken = (req, res, next) => {
    // const headers = {"Authorization": "Bearer <token>"}
    // "Bearer <token>" 공백으로 분할해서 두번째 요소를 토큰으로 사용
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ result: 0, message: '토큰이 없습니다.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.customer = decoded;
        next(); // 다음 미들웨어로 넘김
    }
    catch (err) {
        return res.status(401).send({ result: 0, message: '유효하지 않은 토큰입니다.' });
    }
}

const generateAccessToken = (customer) => {
    // 만료시간을 짧게. 이메일과 이름을 토큰에 포함시컴
    // JWT에 패스워드 같은 민감정보는 포함 시키면 안됨.
    return jwt.sign(customer, JWT_SECRET, { expiresIn: '1h' });
}

const generateRefreshToken = (customer) => {
    // 발급 보안상 만료시간을 길게
    return jwt.sign(customer, JWT_SECRET, { expiresIn: '7d' });
}

export { verifyToken, generateAccessToken, generateRefreshToken, };