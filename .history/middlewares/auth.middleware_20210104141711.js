import { Request, Response, NextFunction } from 'express';



export const checkRegisterData = async (req: Request, res: Response, next: NextFunction) => {

        let schema = 


    // try {
    //     const token = req.headers['authorization'];
    //     if (!token) return sendResp(res, ERROR.JWT_TOKEN_INVALID, {});
    //     const headerType = token.split(' ')[0];
    //     const tokenValue = token.split(' ')[1] && token.split(' ')[1].trim();
    //     if (headerType.trim() === "Beerus" && tokenValue) {
    //         const data = jwtTokenDecoder(tokenValue);
    //         // console.log(data);
    //         if (data.success) {
    //             const entity = await Entity.findOne({ dghoID: data.tokenData.dghoID });
    //             req.userId = String(entity._id);
    //             req.dghoID = entity.dghoID;
    //             req.entNM = entity.entNM;
    //             return next()
    //         }
    //     } 
    //     return sendResp(res, ERROR.JWT_TOKEN_INVALID, {});
    // } catch (err) {
    //     return handleError(res, err, {});
    // }
}