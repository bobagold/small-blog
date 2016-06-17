<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Blog controller.
 *
 * @Route("/blog")
 */
class BlogController extends Controller
{
    /**
     * @Route("/", name="blog_index")
     * @Method({"GET", "POST"})
     */
    public function indexAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            return $this->postArticle($request, new Article());
        }
        $em = $this->getDoctrine()->getManager();

        $articles = $em->getRepository('AppBundle:Article')->findAll();
        return new JsonResponse(array_map([$this, 'showArticle'], $articles));
    }

    /**
     * @Route("/{id}", name="blog_article")
     * @Method({"GET", "PUT"})
     */
    public function articleAction(Request $request, Article $article)
    {
        if ($request->getMethod() == 'PUT') {
            return $this->postArticle($request, $article);
        }
        return new JsonResponse($this->showArticle($article));
    }

    /**
     * @param Article $article
     * @return array
     */
    public function showArticle(Article $article)
    {
        return [
            'url' => $this->articleUrl($article),
            'title' => $article->getTitle(),
            'body' => $article->getBody(),
            'created' => $article->getCreated()->format('Y-m-d H:i'),
        ];
    }

    /**
     * @param Request $request
     * @param Article $article
     * @return JsonResponse
     */
    private function postArticle(Request $request, Article $article)
    {
        $existing = $article->getId();
        $form = $this->createForm('AppBundle\Form\ArticleType', $article, ['csrf_protection' => false]);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);
        if (!$existing) {
            $article->setCreated(new \DateTime());
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($article);
            $em->flush();

            return new JsonResponse(
                $existing ? 'updated' : 'created',
                $existing ? Response::HTTP_OK : Response::HTTP_CREATED,
                [
                    'Location' => $this->articleUrl($article)
                ]
            );
        }
        $error = $data !== null ? (string)$form->getErrors(true, false) : 'invalid json';
        return new JsonResponse($error, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param Article $article
     * @return string
     */
    private function articleUrl(Article $article)
    {
        return $this->generateUrl('blog_article', array('id' => $article->getId()));
    }

}
